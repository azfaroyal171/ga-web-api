const {INPUT} = process.env;

if (!INPUT) {
  throw new Error('INPUT is not given');
}

const main = async () => {
  console.log(`Hello, ${INPUT}!`);

  console.log('Done!');
};

process.on('unhandledRejection', err => {
  console.error(err);
});

main();
