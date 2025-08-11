import colors from 'colors';

colors.red('Anticrash.');

export const Logger = {
  log: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[LOG]'.rainbow + ' - ' + hour.green + ' - ' + message.blue);
  },
  error: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[ERROR]'.red + ' - ' + hour.green + ' - ' + message.blue);
  },
  warn: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[WARN]'.yellow + ' - ' + hour.green + ' - ' + message.blue);
  },
  info: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[INFO]'.cyan + ' - ' + hour.green + ' - ' + message.blue);
  },
  debug: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[DEBUG]'.magenta + ' - ' + hour.green + ' - ' + message.blue);
  },
  command: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log(
      '[COMMAND]'.bgMagenta + ' - ' + hour.green + ' - ' + message.blue,
    );
  },
  slashcommand: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log(
      '[SLASHCOMMAND]'.bgCyan + ' - ' + hour.green + ' - ' + message.blue,
    );
  },
  event: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[EVENT]'.bgGreen + ' - ' + hour.green + ' - ' + message.blue);
  },
  api: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[API]'.bgBlue + ' - ' + hour.green + ' - ' + message.blue);
  },
  database: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[DATABASE]'.bgRed + ' - ' + hour.green + ' - ' + message.blue);
  },
  shards: (message: string) => {
    let hours = (
      new Date().getHours().toString().length === 1
        ? '0' + new Date().getHours()
        : new Date().getHours()
    ).toString();
    let minutes = (
      new Date().getMinutes().toString().length === 1
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    ).toString();
    let seconds = (
      new Date().getSeconds().toString().length === 1
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
    ).toString();

    let hour = hours + ':' + minutes + ':' + seconds;
    console.log('[SHARDS]'.red + ' - ' + hour.green + ' - ' + message.blue);
  },
};
