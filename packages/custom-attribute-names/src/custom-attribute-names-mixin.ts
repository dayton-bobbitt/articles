function camelCaseToKebabCase(str: string): string { return str; }

function kebabCaseAttributes<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        static createProperty(name, options) {
            // derive the attribute name for properties where `attribute` is 1) not already defined or 2) disabled
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
