> NOTE: this is a rough draft of [tthis article published on Medium](https://medium.com/@dayton-bobbitt/generating-attributes-for-litelement-properties-f972ef658137).

**Web Components**
# Generating attributes for LitElement properties
**Streamline your code with a custom implementation of LitElement's createProperty method**

_This guide explains how you can streamline your Web Component code by overriding parts of the LitElement API to generate attributes using any naming convention._

## Introduction to LitElement properties and attributes
A [LitElement property](https://lit-element.polymer-project.org/guide/properties#overview) is a JavaScript class property that is observed by LitElement. Whenever the value of a LitElement property changes, the [update lifecycle](https://lit-element.polymer-project.org/guide/lifecycle#overview) will run to determine if the component needs to render.

An [observed attribute](https://lit-element.polymer-project.org/guide/properties#observed-attributes) is created for each LitElement property, and the attribute will have the same name as the property, in lowercase, if its name is not provided. 

[Example of LitElement's default naming convention for attributes](https://gist.github.com/dayton-bobbitt/05759da77dd513f25d231cf124e4b5a6)

You may find yourself defining multi-word properties such as `propOne` above. This property is easy to read in camelCase but difficult to read as the lowercase attribute `propone`. For such properties, you can improve the readability of the attribute by naming it explicitly using a different convention, such as kebab-case.

[Example of explicitly naming attributes to improve readability](https://gist.github.com/dayton-bobbitt/cd0c235907eaee8fad6efbb542337bbb)

## Overriding LitElement's createProperty method

Explicitly naming attributes improves readability at the cost of maintainability. By specifying a name for the LitElement property and its attribute, you run the risk of renaming one without renaming the other.

[Example of renaming a LitElement property without renaming its attribute](https://gist.github.com/dayton-bobbitt/becad2b8a96196e0fb520bbb90ca4ff4)

[LitElement's createProperty method](https://lit-element.polymer-project.org/api/classes/_lib_updating_element_.updatingelement.html#createproperty) can be overwritten to eliminate this risk and allow you to write less code (win-win!). The `createProperty` method is automatically called once for each property and is a great place to generate attribute names using any naming convention.

[Example of overriding LitElement's createProperty method to generate attribute names using kebab-case](https://gist.github.com/dayton-bobbitt/ea52024335c1a674233810c8caf9e9d0)

## Sharing the love

Overriding LitElement's `createProperty` method is an easy way to simplify your code and make it less error-prone. But what if you are building multiple Web Components with LitElement? In this case, you can override the `createProperty` method within a base class or as a mixin so that your entire component library can benefit.

[Working example of using a mixin to override LitElement's createProperty method](https://stackblitz.com/edit/deriving-lit-element-attributes?file=src%2Fmixins%2Fkebab-case-attributes.ts)

---

_I hope this guide was a valuable introduction to how you can override parts of the LitElement API to simplify your Web Complements. Please leave a comment or [reach out to me on Twitter](https://twitter.com/DaytonBobbitt) if you have any questions!_
