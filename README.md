# unicafe-cli

A simple app to show and search menus and restaurants of [Unicafe](http://www.unicafe.fi).

### Installation
Install `unicafe-cli` globally.
```
    (sudo) npm install -g unicafe-cli
```

### Usage

#### Showing menus
```
    unicafe-cli <query>
```
Query required. Shows today's menu for the searched restaurant or restaurants (max 3). 

Use `-w` to show menus for the whole ongoing week.
```
    unicafe-cli <query> -w
```

#### Listing restaurants
```
    unicafe-cli -r
```
List all the restaurants of Unicafe.

#### Options
These can be used every time a restaurant is searched.
 ```
          -h, --help          show help
          -v, --version       
          -w, --week          output menus for the whole ongoing week
          -e, --english       output the menus in english instead of finnish
          --only-id           search only from restaurant ids
          --only-area         search only from restaurant area names
          --only-name         search only from restaurant names
          -r, --restaurants   print a list of all the available restaurants
          --favorite          save the search to be used later, if no options are given
 ```
 
## Examples
Input:
```
    unicafe-cli kumpula
```
Output:
```
Chemicum
ke 14.12.
┌──────────────────────────────────────────────┬──────────────────────────────────┬─────────────┐
│ Nimi                                         │                                  │             │
├──────────────────────────────────────────────┼──────────────────────────────────┼─────────────┤
│ Joulukinkkua, jyväsinappikastiketta          │ G, L                             │ Edullisesti │
├──────────────────────────────────────────────┼──────────────────────────────────┼─────────────┤
                    ...                             ...                                 ...
├──────────────────────────────────────────────┼──────────────────────────────────┼─────────────┤
│ Savustettua kirjolohta, piparjuurikastiketta │ G, L                             │ Maukkaasti  │
└──────────────────────────────────────────────┴──────────────────────────────────┴─────────────┘
Exactum
ke 14.12.
┌───────────────────────────────────────────────────┬─────────┬─────────────┐
│ Nimi                                              │         │             │
├───────────────────────────────────────────────────┼─────────┼─────────────┤
│ Joulukinkkua, jyväsinappikastiketta               │ G, L    │ Edullisesti │
├───────────────────────────────────────────────────┼─────────┼─────────────┤
                    ...                                 ...         ...
├───────────────────────────────────────────────────┼─────────┼─────────────┤
│ Savustettua kirjolohta, piparjuurikastiketta      │ G, L    │ Maukkaasti  │
└───────────────────────────────────────────────────┴─────────┴─────────────┘

Physicum
ke 14.12.
┌───────────────┬──┬─────────────┐
│ Nimi          │  │             │
├───────────────┼──┼─────────────┤
│ Paninilounas  │  │ Edullisesti │
├───────────────┼──┼─────────────┤
│ Patonkiateria │  │ Edullisesti │
└───────────────┴──┴─────────────┘

```

Input:
```
    unicafe-cli 5 --only-id -w
``` 

Output:

```
Cafe Portaali
ma 12.12.
┌───────────────────────┬──────────────┬─────────────┐
│ Nimi                  │              │             │
├───────────────────────┼──────────────┼─────────────┤
│ Herkkusienikeittoa    │ G, K, L      │ Edullisesti │
├───────────────────────┼──────────────┼─────────────┤
│ Paahtopaistisalaattia │ G, L, M, [S] │ Edullisesti │
├───────────────────────┼──────────────┼─────────────┤
│ Paninilounas          │              │ Edullisesti │
└───────────────────────┴──────────────┴─────────────┘
ti 13.12.
┌─────────────────────────────────────┬──────────────┬─────────────┐
│ Nimi                                │              │             │
├─────────────────────────────────────┼──────────────┼─────────────┤
│ Broilerisalaattia                   │ G, L, M      │ Edullisesti │
├─────────────────────────────────────┼──────────────┼─────────────┤
                ...                         ...           ...
├─────────────────────────────────────┼──────────────┼─────────────┤
│ Mansikka-jogurttirahkaa             │ G, K, L      │ Makeasti    │
└─────────────────────────────────────┴──────────────┴─────────────┘
ke 14.12.
┌─────────────────────────────────┬──────────────┬─────────────┐
│ Nimi                            │              │             │
├─────────────────────────────────┼──────────────┼─────────────┤
│ Juuressosekeittoa               │ G, K, L, [S] │ Edullisesti │
├─────────────────────────────────┼──────────────┼─────────────┤
            ...                         ...             ...
├─────────────────────────────────┼──────────────┼─────────────┤
│ Paninilounas                    │              │ Edullisesti │
└─────────────────────────────────┴──────────────┴─────────────┘
to 15.12.
┌─────────────────┬──┬─────────────┐
│ Nimi            │  │             │
├─────────────────┼──┼─────────────┤
│ Lounassalaattia │  │ Edullisesti │
├─────────────────┼──┼─────────────┤
│ Paninilounas    │  │ Edullisesti │
├─────────────────┼──┼─────────────┤
│ Päivän keitto   │  │ Edullisesti │
└─────────────────┴──┴─────────────┘
pe 16.12.
┌─────────────────┬──┬─────────────┐
│ Nimi            │  │             │
├─────────────────┼──┼─────────────┤
│ Lounassalaattia │  │ Edullisesti │
├─────────────────┼──┼─────────────┤
│ Paninilounas    │  │ Edullisesti │
├─────────────────┼──┼─────────────┤
│ Päivän keitto   │  │ Edullisesti │
└─────────────────┴──┴─────────────┘
```
