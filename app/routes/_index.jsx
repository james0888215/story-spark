import DOMPurify from "dompurify";
import { PropagateLoader } from "react-spinners";
import Response from "../components/response";
import styles from "~/styles/index.css";
import inputStyles from "~/styles/input.css";
import logo from "../../public/storyspark.png"
import settings from "../../public/settings.svg"
import { useState, useEffect } from "react";
import { submitPrompt } from "~/api.server";
import { Form, useActionData } from '@remix-run/react'


export const action = async ({ request }) => {
  const body = await request.formData();
  console.log(body)
  const name = body.get("name");
  const gender = body.get("gender");
  const time = body.get("time");
  //test
  const data = await submitPrompt(name, gender, time);

  return data;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: inputStyles,
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: "favicon.ico",
    },
    { rel: "manifest", href: "site.webmanifest" },
  ];
}


export default function Index() {
  const data = useActionData();
  const [isReady, setIsReady] = useState(false);
  const [speechInput, setSpeechInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    // setIsReady(true);
    setIsLoading(false)
    setResponse(data)
  }, [data]);



  async function onSubmit() {
    setResponse("");
    setIsLoading(true);
    setError("");
  }

  if (!isReady) {
    return null;
  }

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="Story Spark" />

      </div>

      <div className="main">
        <div className="input-component">
          <h2>
            Put your child at the heart of a story
          </h2>

          {/* form */}
          <Form method="post">
          {/* <img src={settings} className="settings" alt="settings icon" /> */}

            <div className="buttons">

              {/* reset button */}
              {/* <div className="button-container">
            <button type="button" tabIndex="-1" onClick={reset} disabled={!speechInput}>
              Reset
            </button>
          </div> */}
            </div>

            <div className="input-container">
              {/* name input */}
              <input
                tabIndex="1"
                type="text"
                name="name"
                className="word-input"
                value={speechInput}
                placeholder="Childs Name"
                onChange={(e) => setSpeechInput(e.target.value)}
              />

              <select name="gender" id="gender">
                <option value="girl">Girl</option>
                <option value="boy">Boy</option>
              </select>

              <select name="time" id="time">
                <option value="1">1 Minute</option>
                <option value="3">3 Minute</option>
                <option value="5">5 Minute</option>
              </select>

              {/* submit button */}
              <button
                type="submit"
                className="submit-btn"
                onClick={onSubmit}
              // disabled={isLoading || !speechInput}
              >
                Spark
              </button>

              {/* error message */}
              {error && (
                <div
                  className="error"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(error),
                  }}
                ></div>
              )}
            </div>
          </Form>

          {/* loader */}
          {isLoading && <PropagateLoader color="#ffbac3" className="loader" />}

          {/* response */}
          {response && <Response data={response} query={""} />}
        </div>
        {/* <div className="selection-menu" onClick={console.log("CLICK")}>
            +
        </div> */}
      </div>
    </div>
  );
}
