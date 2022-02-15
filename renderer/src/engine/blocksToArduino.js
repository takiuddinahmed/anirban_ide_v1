import codingData from "./data";

const addBlockCode = (blcks, source, destination, unique = true,pause=false) => {
  blcks.forEach((block) => {
    source.forEach((d) => {
      if (d.types.some((type) => type === block.name)) {
        const index = destination.findIndex((x) => x.id === d.id);
        if (index < 0 || !unique) {
          destination.push(d);
        }
      }
    });
  });
  if (pause & blcks.length > 0){
    destination.push({code: codingData.pauseCode, types: []});
  }
};

export default async function blocksToArduino(blocks = []) {
  let code = ``;

  const startCodeBlocks = [];
  const setupCodeBlocks = [];
  const loopCodeBlocks = [];
  const functionCodeBlocks = [];
  await addBlockCode(blocks, codingData.startCodingData, startCodeBlocks);
  await addBlockCode(blocks, codingData.setupCodingData, setupCodeBlocks,true,true);
  await addBlockCode(blocks, codingData.loopCodingData, loopCodeBlocks, false,!check_line_follow_exist(blocks));
  await addBlockCode(blocks, codingData.functionCodingData, functionCodeBlocks);

  code += startCodeBlocks.map((block) => block.code).join("");
  code += `\nvoid setup(){\n`;
  code += setupCodeBlocks.map((block) => block.code).join("");
  code += `\n}\n`;
  code += `\nvoid loop(){\n`;
  code += loopCodeBlocks.map((block) => block.code).join("");
  code += `\n}\n`;
  code += functionCodeBlocks.map((block) => block.code).join("");
  console.log(code);
  return code;
}

const check_line_follow_exist = (blocks) => {
  let exist = false;
  exist =  blocks?.some((block) => block?.name === "line_follow");
  console.log({exist});
  return exist;
}
