# Customizing the names of LitElement attributes

By the end of this article you'll know how to extend one of LitElement's core features to make your Web Components smaller and less error prone.

The following was tested with LitElement 2.x and 3.x.

## Before we begin
This article assumes you have basic knowledge of Web Components and LitElement. If you're unfamiliar with these technologies I would recommend browsing some of the following resources in order to get the most from this article:

* Article 1
* Article 2

## Some background
LitElement's ability to generate a corresponding [attribute](https://lit-element.polymer-project.org/guide/properties#attributes) for [properties](https://lit-element.polymer-project.org/guide/properties#overview) is really powerful and allows for your web component to used in a much more native way. By default, the attribute name will be the same as the property name but all lowercase.

```typescript
class MyComponent extends LitElement {
    @property()
    public propA;   // attribute name will be `propa`
}
```

Fortunately, the LitElement `property` decorator allows you to customize the name of the corresponding attribute. Let's use kebab-case to make it a bit more readable.

```typescript
class MyComponent extends LitElement {
    @property({ attribute: "prop-a" })
    public propA;
}
```

This is great, and if you are building a single component without many properties you can likely just stop here.

## Getting fancy
If you are building a more complex component or a library of components, it'd be nice if you could tell LitElement to derive the attribute name you want without having to set it explicitly for each property. This will not only save you time but will also eliminate the risk of you updating the name of the property and not the attribute.

Luckily, LitElement's `static createProperty` method allows us to do just that. We can override this method so that we can programmatically specify the attribute's name based on the name of the property. This will work regardless of wether you are using `static get properties` or the `@property` decorator.

```typescript
import { camelCaseToKebabCase } from "some-library";

class MyComponent extends LitElement {
    @property()
    public propA;   // attribute name will be `prop-a`

    @property({ attribute: "customNameForPropB" })
    public propB;   // attrtibute name will be "customNameForPropB"

    @property({ attribute: false })
    public propC;   // LitElement will not add an observed attribute for propC

    static createProperty(name, options) {
        // derive the attribute name for properties where `attribute` is 1) not already defined or 2) disabled
        if (typeof options.attribute === "undefined" || options.attribute === true) {
            Object.assign(options, {
                attribute: camelCaseToKebabCase(name)
            });
        }

        super.createProperty(name, options);
    }
}
```

This method will be called once for each of your web component's properties. In this example, I've used a hypothetical function to transform the property name (camelCase) into the name for the attribute (kebab-case). You can use any method here to generate attribute names for your components.

If you are building a library of components, you'll likely want to move the custom `createProperty` definition to a base class that all of your other component classes can inherit from:

```typescript
import { camelCaseToKebabCase } from "some-library";

class BaseComponent extends LitElement {
    static createProperty(name, options) {
        // derive the attribute name for properties where `attribute` is 1) not already defined or 2) disabled
        if (typeof options.attribute === "undefined" || options.attribute === true) {
            Object.assign(options, {
                attribute: camelCaseToKebabCase(name)
            });
        }

        super.createProperty(name, options);
    }
}

class MyComponent extends BaseComponent {
    @property()
    public propA;

    @property()
    public propB;
}
```

Alternatively, if you use TypeScript, you could implement your own mixin function to use as a [Class Decorator](https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators).

```typescript
import { camelCaseToKebabCase } from "some-library";

function kebabCaseAttributes<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        static createProperty(name, options) {
            if (typeof options.attribute === "undefined" || options.attribute === true) {
                Object.assign(options, {
                    attribute: camelCaseToKebabCase(name)
                });
            }

            // @ts-ignore
            super.createProperty(name, options);
        }
    };
}

@kebabCaseAttributes()
class MyComponent extends LitElement {
    @property()
    public propA;

    @property()
    public propB;
}
```