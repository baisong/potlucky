<script lang="ts">
    import HighlightGroup from '$components/HighlightGroup.svelte';
    // From Typescript PostCSS Template
    // https://github.com/JoshQuaintance/SvelteKit-Template
    import Highlight from '$components/Highlight.svelte';
</script>

<svelte:head>
    <title>Potluck</title>

    <meta
        name="description"
        content="An opinionated SvelteKit template complete with Tailwind, PlayWright, Vitest, and Husky pre-installed" />
</svelte:head>

<div class="container">
    <span class="text-9xl font-bold mb-10" id="techStack">
        Potluck<br />
        <a href="https://kit.svelte.dev" target="_blank" rel="noreferrer">
            <span id="sveltekit" class="bg-clip-text bg-gradient-to-r text-transparent">SvelteKit</span>
        </a>

        <br />

        <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
            <span id="tailwind" class="bg-clip-text bg-gradient-to-r text-transparent">Tailwind</span>
        </a>!
    </span>

    <h1>Players</h1>
    <HighlightGroup>
        <Highlight />
        <Highlight />
        <Highlight />
    </HighlightGroup>

    <h1>Gifts</h1>
    <HighlightGroup>
        <Highlight />
        <Highlight />
        <Highlight />
    </HighlightGroup>
</div>

<style lang="postcss">
    div.container {
        @apply flex flex-col justify-around items-center;
        @apply dark:bg-gray-900 dark:text-white;
        @apply leading-loose h-screen pb-24;
    }

    #sveltekit {
        @apply cursor-pointer;
        @apply from-[#FE5858] via-[#FC9842] to-[#eb9927];
    }

    #tailwind {
        @apply cursor-pointer;
        @apply from-green-400 via-blue-500 to-indigo-500;
    }
</style>
