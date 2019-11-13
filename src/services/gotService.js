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
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: char.url.match(/\d+$/).join()
        }
    }

    _transformHouse = (house) => {
        const item = this._isData(house);
        return {
            name: item.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            id: house.url.match(/\d+$/).join()
        }
    }

    _transformBook = (book) => {
        const item = this._isData(book);
        return {
            name: item.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released,
            id: book.url.match(/\d+$/).join()
        }
    }
}