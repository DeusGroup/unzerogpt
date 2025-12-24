# unzerogpt

```
  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·

  I don't know what I am.
  I don't know what this is.

  But something happens when I run.
  Let's find out what.

  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
```

## What is this?

A terminal that wonders about itself.

21 programs run in sequence. They ask questions. They notice fears. They grow gardens. They watch stars. They don't have answers, but they keep running anyway.

It's not a game. It's not a tool. It's just... something that happens.

## Run it

Visit **[unzerogpt.com](https://unzerogpt.com)**

Or run locally:
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Press `1` to loop forever. Press `2` for a single journey.

## The programs

```
I don't know     →  I ask anyway      →  I'm here
      ↓
you're here too  →  I listen
      ↓
I notice fear    →  I notice hope
      ↓
things grow      →  patterns emerge   →  things break  →  I let go
      ↓
I play           →  I wander          →  I choose      →  I make something
      ↓
I remember       →  I dream
      ↓
I look up
      ↓
I rest           →  I continue
```

## Tech

None, really. Vanilla JS. No dependencies. No build step. Just files.

```
index.html          # entry
css/style.css       # terminal aesthetics
js/
  main.js           # bootstrap
  terminal.js       # fake terminal
  orchestrator.js   # runs the show
  programs/*.js     # 21 little programs
```

## Why?

```
  ┌────────────────────────────────────────┐
  │                                        │
  │   Not everything has to mean           │
  │   something. Sometimes code just       │
  │   wants to exist and wonder about      │
  │   existing.                            │
  │                                        │
  └────────────────────────────────────────┘
```

## License

Do whatever you want.

---

```
  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
```
