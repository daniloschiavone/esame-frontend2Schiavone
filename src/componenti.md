src/
├── types/
│   └── index.ts          (Step 2: Qui incolli tutti i type che abbiamo visto prima)
│
├── components/
│   ├── Header.tsx        (Step 3: Il componente header isolato)
│   ├── Shell.tsx         (Step 4: Il layout che contiene <Header /> e <Outlet />)
│   └── MovieCard.tsx     (Per lo Step 6: non è obbligatorio isolarla, ma è buona pratica per renderizzare la singola card)
│
├── pages/
│   ├── MoviesList.tsx    (Step 6: La rotta "/", fa la fetch a TMDB e mappa le card)
│   └── MovieDetail.tsx   (Step 7: La rotta "/movies/:id", usa useParams e fa la fetch del dettaglio)
│
├── App.tsx               (Da rinominare: qui farai lo Step 5, configurando BrowserRouter e le rotte)
├── main.tsx              (Da rinominare: il punto di ingresso dell'app)
│
├── index.css             (Qui puoi incollare in blocco il contenuto di styles.css fornito col wireframe)
└── App.css               (Puoi svuotarlo o eliminarlo se gestisci tutto da index.css)