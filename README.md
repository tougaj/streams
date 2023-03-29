# streams

Сайт для перегляду трансляцій з online-камер.

## Налаштування

Скопіюйте та перейменуйте файл **./server/templates/dotenv** в **./server/.env** та задайте в ньому необхідні параметри:

- **PORT** (за необхідності) — порт, на якому буде слухати сервер, по замовчанню **3001**;
- **PROXY** (за необхідності) — адреса проксі-серверу в форматі **http(s)://\<userName\>:\<password\>@\<proxyAddress\>:\<proxyPort\>/**;
- **STREAM_LIST_ADDRESS** — адреса, за якою можливо отримати список стрімів (щось на кшталт **http://127.0.0.1:8080/v1/paths/list**). Даний параметр є обов'язковим.
