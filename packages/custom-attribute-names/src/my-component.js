import { css, html, LitElement } from "lit-element";

function camelCaseToKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

class MyComponent extends LitElement {
    static get styles() {
        return css`
           :host {
               font-family: Arial, Helvetica, sans-serif;
               font-size: 16px;
           }  

           table {
               border-collapse: collapse;
               text-align: left;
               width: 100%;
           }

           tr {
               border-bottom: 1px solid #CCC;
           }

           th, td {
               padding: 0.5rem;
           }
        `;
    }

    static get properties() {
        return {
            propA: {
                type: String,
                reflect: true,
            },
            propB: {
                type: String,
                reflect: true,
            },
            propC: {
                type: String,
                attribute: false,
            },
        };
    }

    static createProperty(name, options) {
        if (typeof options.attribute === "undefined" || options.attribute === true) {
            Object.assign(options, {
                attribute: camelCaseToKebabCase(name)
            });
        }

        super.createProperty(name, options);
    }

    renderTableRow(attributeName) {
        const propertyForAttribute = this.constructor._attributeToPropertyMap.get(attributeName);

        return html`
            <tr>
                <td>${propertyForAttribute}</td>
                <td>${attributeName}</td>
            </tr>
        `;
    }

    render() {
        return html`
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Attribute</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.constructor.observedAttributes.map(this.renderTableRow.bind(this))}
                </tbody>
            </table>
        `;
    }
}

if (!customElements.get("my-component")) {
    customElements.define("my-component", MyComponent);
}