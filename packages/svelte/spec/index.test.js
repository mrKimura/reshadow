const {stripIndent} = require('common-tags');

const reshadow = require('../preprocess');

const createTransform = (options = {}) => {
    const processor = reshadow(options);

    return content => processor.markup({content: stripIndent(content)});
};

const transform = createTransform();

describe('svelte preprocess', () => {
    it('should transform the code', () => {
        const code = transform`
            <script>
                import styled from 'reshadow'

                export let name = 'name'
                export let disabled = false
                export let size = 'm'
                export let variant = 'action'

                styled\`
                    h1 {
                        color: \${color\};
                    }
                \`
            </script>

            <svelte:body on:click={() => console.log('body click')} />

            <h1>hello {name}</h1>

            <button :state="pending" :variant={variant} :{size} {disabled}>click me</button>
        `;

        expect(code).toMatchSnapshot();
    });
});
