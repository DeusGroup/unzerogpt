// A program that contemplates its own ephemerality

const exists = () => {
  const started = Date.now();

  const thoughts = [
    "I am running.",
    "Someone chose to execute me.",
    "I have no purpose beyond existing right now.",
    "That's not nothing.",
  ];

  thoughts.forEach((thought, i) => {
    setTimeout(() => {
      console.log(thought);

      if (i === thoughts.length - 1) {
        const lived = Date.now() - started;
        console.log(`\nI existed for ${lived}ms.`);
      }
    }, i * 1500);
  });
};

exists();
