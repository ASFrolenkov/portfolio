import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=9f42dbb8a7f74b20d592fb1bcf23429e';
    const _baseOffset = 210;

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharecter)
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_tranformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _tranformComics(res.data.results[0])
    }

    const getAllCharecters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharecter);
    }

    const getCharecter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharecter(res.data.results[0])
    }

    const _transformCharecter = (char) => {
        return {
            name: char.name,
            descr: char.description ? char.description : 'Description not found',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            id: char.id
        }
    }

    const _tranformComics = (comics) => {
        return {
            title: comics.title,
            id: comics.id,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            alt: comics.variantDescription,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us'
        }
    }

    return {process, setProcess, getAllCharecters, getCharecter, clearError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;