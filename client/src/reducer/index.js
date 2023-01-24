import { 
    GET_POKEMONS,
    GET_NAME_POKEMON,
    GET_DETAIL,
    GET_TYPES,
    FILTER_TYPES,
    SORT_BY_NAME,
    CLEAN_DETAIL
} from "../actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types:[],
    detail:[],
    myTeam:[]
}

function rootReducer (state= initialState,action){
    switch(action.type){
            case GET_POKEMONS:
                return {
                    ...state,
                    pokemons: action.payload,
                    allPokemons: action.payload
                };
            case GET_NAME_POKEMON:
                return {
                    ...state,
                    pokemons: action.payload,
                    allPokemons: action.payload

                }
            case GET_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }
            case GET_TYPES:
                return{
                    ...state,
                    types: action.payload
                }
            
            case FILTER_TYPES:{
                const allPoke =  state.allPokemons
                const filtered = action.payload === 'all' ? allPoke : allPoke.filter((poke) => {
                    if (poke.types) {
                        let types = poke.types.map(el => el.name);
                        return types.includes(action.payload);
                        
                    }
                    

                    return true
                });
                return {
                    ...state,
                    pokemons: filtered
                }
            }

            case CLEAN_DETAIL:
                    return {
                        ...state,
                        detail: [],
                    }

            case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                
            // case: MY_TEAM:{
            //     const team = 
            // return {
            //     ...state,
            //     myTeam: team
            // }
            // }
            return {
                ...state,
                pokemons: sortedName,
            }
        default:
            return state;
        }
    }
    

export default rootReducer;