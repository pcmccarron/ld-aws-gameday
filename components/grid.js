import React, { useEffect, useState } from "react";
import ls from "local-storage";
import { Image, Divider } from 'semantic-ui-react';

export default function Grids(userObj) {
  async function setID() {
    let id = ls.get("LD_User_Key");
    return id;
  }

  const [dummyData, setDummyData] = useState([]);

  const seedData = [
    {
      "id": 1,
      "title": "Debug Ipsum 1",
      'text': "This is our debug text. Charlie ate the last candy bar.",
      'image': './unicorn-mane.jpg'
    },
    {
      "id": 2,
      "title": "Debug Ipsum 2",
      "text": "We're debugging all the Unicorns. They are trampling our code.",
      'image': './unicorn-rainbow.jpg'
    },
    {
      "id": 3,
      "title": "Debug Ipsum 3",
      "text": "Will it ever end? Speculation is nay. It likely won't.",
      'image': './unicorn-dab.png'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let id = await setID();
      const response = await fetch(
        window.location.protocol +
        "//" +
        window.location.host +
        "/datas"
      );
      if (response.status != 200) {
        setDummyData(seedData);
        return seedData;
      } else {
        const nbdData = await response.json();
        setDummyData(nbdData[0]);
      }
    };
    fetchData();
  }, [userObj]);

  return (
    <div className="grid space-x-4 justify-center invisible sm:invisible md:visible py-10">
      <div className="grid grid-cols-3 justify-center font-sohne">
        {dummyData.map(function (card) {
          return (
            <div key={card.id}
              className={`justify-items-center rounded-lg shadow-2xl bg-white mx-20 py-3 px-3 text-black border-4 border-white hover:border-ldpurple`}
            >
              <Image src={card.image} size="small" centered />
              <h1 className="text-2xl sm:text-base xl:text-2xl text-black text-center">
                {card.title}
              </h1>
              <Divider />
              <p className="text-black text-center text-xl text-black invisible md:text-xl xl:text-xl sm:invisible md:invisible xl:visible">
                {card.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
