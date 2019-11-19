export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async() => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character)
    }


    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._transformBook)
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book)
    }


    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._transformHouse)
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformBook(house)
    }

    _isData = item => {
        for (const prop in item) {
            if (item[prop] === '') {
                item[prop] = 'n/a'
            }
        }
        return item;
    };
    _transformCharacter = (char) => {
        const item = this._isData(char);
        return {
            name: item.name,
            gender: item.gender,
            born: item.born,
            died: item.died,
            culture: item.culture,
            id: item.url.match(/\d+$/).join()
        }
    }

    _transformHouse = (house) => {
        const item = this._isData(house);
        return {
            name: item.name,
            region: item.region,
            words: item.words,
            titles: item.titles,
            overlord: item.overlord,
            ancestralWeapons: item.ancestralWeapons,
            id: item.url.match(/\d+$/).join()
        }
    }

    _transformBook = (book) => {
        const item = this._isData(book);
        return {
            name: item.name,
            numberOfPages: item.numberOfPages,
            publiser: item.publiser,
            released: item.released,
            id: item.url.match(/\d+$/).join()
        }
    }
}