import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('Vuex - Pruebas en el journal module', () => {
    test('Este es el estado inicial, debe de tener este state', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })
    test('Mutation: setEntries', () => {
        const store = createVuexStore({
            isLoading: true,
            entries: []
        })
        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.isLoading).toBeFalsy()
    })
    test('Mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: '-MhKIM4yNixGFCSr6eE0',
            date : 1629223732404,
            text : 'Este es un nuevo día con Vue.js y Jest'
        }
        store.commit('journal/updateEntry', updatedEntry)
        const storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    })
    test('Mutation: addEntry deleteEntry', () => {
        const store = createVuexStore(journalState)
        store.commit('journal/addEntry', { id: 'ABC-123' })
        let storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(4)
        expect(storeEntries.find(e => e.id === 'ABC-123')).toBeTruthy()
        store.commit('journal/deleteEntry', 'ABC-123')
        storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e => e.id === 'ABC-123')).toBeFalsy()
    })
    test('Getters: getEntriesByTerm getEntryById', () => {
        const store = createVuexStore(journalState)
        const [ entry1, entry2, entry3] = journalState.entries
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(3)
        expect(store.getters['journal/getEntriesByTerm']('día').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('día')).toEqual([entry1])
        expect(store.getters['journal/getEntryById']('-MhKJEPG5r_aho2_C8cl')).toEqual(entry2)
    })
    test('Actions: loadEntries', async () => {
        const store = createVuexStore({
            isLoading: false,
            entries: []
        })
        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(3)
    })
    test('Actions: updateEntry', async () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: '-MhKIM4yNixGFCSr6eE0',
            date : 1629223732404,
            text : 'Este es un nuevo día con Vue.js',
            otroCampo: true,
            otroMas: { a: 1 }
        }
        await store.dispatch('journal/updateEntry', updatedEntry)
        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
            id: '-MhKIM4yNixGFCSr6eE0',
            date : 1629223732404,
            text : 'Este es un nuevo día con Vue.js'
        })
    })
    test('Action: createEntry deleteEntry', async () => {
        const store = createVuexStore(journalState)
        const newEntry = {
            date: 1627077227978,
            text: 'Nueva entrada desde las pruebas'
        }
        const newEntryId = await store.dispatch('journal/createEntry', newEntry)
        expect(typeof newEntryId).toBe('string')
        expect(store.state.journal.entries.find(e => e.id === newEntryId)).toBeTruthy()
        await store.dispatch('journal/deleteEntry', newEntryId)
        expect(store.state.journal.entries.find(e => e.id === newEntryId)).toBeFalsy()
    })
})