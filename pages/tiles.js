import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import data from "../data";
import styles from "./Tiles.module.css";
import { shuffle } from "lodash";

const Tile = () => {
  const router = useRouter();
  const { query } = router;

  const [content, setContent] = useState([]);

  const [selectedId, setSelectedId] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [finishedIds, setFinishedIds] = useState([]);

  useEffect(() => {
    let level = localStorage.getItem("level");
    if (level) {
      router.replace({
        query: { level },
      });
    } else {
      router.replace({
        query: { level: 1 },
      });
    }
  }, []);

  useEffect(() => {
    setSelectedStyle("");
    setSelectedId("");
    setContent(shuffle(data[query.level]));
    setFinishedIds([]);
    localStorage.setItem("level", query.level);
  }, [query.level]);

  const checkResult = (id, index) => {
    setSelectedStyle(index);
    if (selectedId) {
      if (selectedId === id) {
        setFinishedIds((curr) => [...curr, selectedId]);
        setSelectedId("");
        if (finishedIds.length + 1 === data[query.level].length / 2) {
          alert("Congrats. You moved to next level");
        }
      } else {
        setSelectedStyle("");
        setSelectedId("");
      }
    } else {
      setSelectedId(id);
    }
  };

  const nextLevel = () => {
    router.replace({
      query: { level: Number(query.level) + 1 },
    });
  };

  if (Number(query.level) === 6) {
    return (
      <div className={styles.container}>
        <h1>Congrats you won</h1>
      </div>
    );
  }

  if (!data[query.level]) {
    return <h1>Loading</h1>;
  }

  console.log("selectedId", selectedId);
  console.log("finishedIds", finishedIds);
  //   console.log(selectedId, selectedStyle, correctCount);

  return (
    <>
      <Head>
        <title>Tiles</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          {finishedIds.length !== data[query.level].length / 2 && (
            <h1>Level {query.level}</h1>
          )}
          {finishedIds.length === data[query.level].length / 2 && (
            <h1
              style={{
                textAlign: "right",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={nextLevel}
            >
              Level {Number(query.level) + 1} →
            </h1>
          )}
        </div>
        <div className={styles.buttonsContainer}>
          {content.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={index}
                  className={styles.button}
                  onClick={() =>
                    finishedIds.includes(item.id) || selectedStyle === index
                      ? null
                      : checkResult(item.id, index)
                  }
                  style={
                    finishedIds.includes(item.id)
                      ? {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          cursor: "default",
                          border: "none",
                        }
                      : selectedStyle === index
                      ? {
                          backgroundColor: "rgba(78, 150, 245, 0.735)",
                        }
                      : {}
                  }
                >
                  <h2
                    style={{
                      transform: "rotate(45deg)",
                    }}
                  >
                    {item.img}
                  </h2>
                </div>
              );
            }
            if (index % 3 === 0) {
              return (
                <div
                  key={index}
                  className={styles.button}
                  onClick={() =>
                    finishedIds.includes(item.id) || selectedStyle === index
                      ? null
                      : checkResult(item.id, index)
                  }
                  style={
                    finishedIds.includes(item.id)
                      ? {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          cursor: "default",
                          border: "none",
                        }
                      : selectedStyle === index
                      ? {
                          backgroundColor: "rgba(78, 150, 245, 0.735)",
                        }
                      : {}
                  }
                >
                  <h2
                    style={{
                      transform: "rotate(-45deg)",
                    }}
                  >
                    {item.img}
                  </h2>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={styles.button}
                onClick={() =>
                  finishedIds.includes(item.id)
                    ? null
                    : checkResult(item.id, index)
                }
                style={
                  finishedIds.includes(item.id) || selectedStyle === index
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        cursor: "default",
                        border: "none",
                      }
                    : selectedStyle === index
                    ? {
                        backgroundColor: "rgba(78, 150, 245, 0.735)",
                      }
                    : {}
                }
              >
                <h2>{item.img}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tile;
