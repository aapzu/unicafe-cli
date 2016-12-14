#unicafe-cli

A simple app to show and search menus and restaurants of [Unicafe](http://www.unicafe.fi).

###Installation
Install `unicafe-cli` globally.
```
(sudo) npm install -g unicafe-cli
```

###Usage

####Listing restaurants
```
    unicafe-cli -r [query]
```
If no query provided, all restaurants will be listed. Otherwise the query is used to search from restaurant names, areas and ids, and the results are listed.

####Showing menus
```
    unicafe-cli -m <query>
```
Query needed. Shows today's menu for the searched restaurant or restaurants (max 3). 

Use `-w` to show menus for the whole ongoing week.
```
    unicafe-cli -m -w <query>
```

####Search params
These can be used every time a restaurant is searched.
 ```
        -i      Only search from ids
        -a      Only search from area names
        -n      Only search from restaurant names
 ```
 
##Examples
Input:
```
    unicafe-cli -m kumpula
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
    unicafe-cli -m -i -w 5
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