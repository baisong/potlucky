// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
}

interface PlayerInput {
    id: number
    name: string
}

interface Player {
    id: number
    name: string
    abbr: string
    color: string
    active: boolean
}

interface Gift {
    id: number
    label: string
    color: string
    from: number
}