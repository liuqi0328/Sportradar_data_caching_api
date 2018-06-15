# Sportradar Data Cache API

## Environment Variables

```bash
DB_HOST=mongodb://localhost/sportRadarApiDB
EU_SOCCER_KEY=gc7tcuqbbqrwt35qpzkgqzhb
INT_SOCCER_KEY=aktncr7yrnu48d9ssvg2pjtq
NCAA_FOOTBALL_KEY=6y6nac78wezgem7qztwt83h5
NBA_KEY=xdajwfjhbagt9hy2heqa4zak
NFL_KEY=62xugypb95cfxdcev99m72ca
CRICKET_KEY=h5hae7v6pc6bpaur9vsxhfz6
```

## API Keys

- To get all of the existing API Keys: send a `GET` request to `/api/v1/api_keys/` with the master API Key as a parameter.
- To create a new API Key: send a `POST` request to `/api/v1/api_keys/` with the master API Key as a parameter.
