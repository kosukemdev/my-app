(async () => {
  try {
    const res = await fetch('http://localhost:3000/works/blog-app');
    console.log('STATUS', res.status);
    const text = await res.text();
    console.log('BODY_START');
    console.log(text.slice(0, 20000));
    console.log('BODY_END');
  } catch (err) {
    console.error('FETCH_ERROR', err);
    process.exitCode = 2;
  }
})();
