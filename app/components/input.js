import { useEffect, useState } from "react";
import "regenerator-runtime";
import DOMPurify from "dompurify";
import { PropagateLoader } from "react-spinners";
import Response from "../components/response.js";

export default function Input() {
  const fetcher = useFetcher();
  console.log(fetcher.data)
  const [isReady, setIsReady] = useState(false);
  const [query, setQuery] = useState("");
  const [speechInput, setSpeechInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const genericError = "Something went wrong :(<br/>Please try again.";


  useEffect(() => {
    setIsReady(true);
  }, []);

  const submit = useSubmit()


  async function onSubmit(e) {
    e.preventDefault();
    submit(e.target.form)

    setResponse("");
    setIsLoading(true);
    setError("");

    // submit openai prompt
    // try {
    //   const response = await submitPrompt(speechInput);
    //   console.log(response, "Response")
    //   // const formattedResult = JSON.parse(response.replace(/\n/g, ""));
    //   setResponse(response);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.log(error, "error")
    //   setError(error.message || genericError);
    //   setIsLoading(false);
    // }
  }

  function reset() {
    setQuery("");
    setResponse("");
    setError("");
  }

  if (!isReady) {
    return null;
  }

  return (
    <div className="input-component">
      <h2>
        🦸‍♀️Put your child at the heart of a story🦸
      </h2>

      {/* form */}
      <fetcher.Form method="post">
        <div className="buttons">

          {/* reset button */}
          {/* <div className="button-container">
            <button type="button" tabIndex="-1" onClick={reset} disabled={!speechInput}>
              Reset
            </button>
          </div> */}
        </div>

        <div className="input-container">
          {/* word input */}
          <input
            tabIndex="1"
            type="text"
            className="word-input"
            value={speechInput}
            placeholder="Heros Name"
            onChange={(e) => setSpeechInput(e.target.value)}
          />

          {/* submit button */}
          <button
            type="submit"
            className="submit-btn"
            onClick={onSubmit}
            disabled={isLoading || !speechInput}
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
        </fetcher.Form>

      {/* loader */}
      {isLoading && <PropagateLoader color="#005277" className="loader" />}

      {/* response */}
      {response && <Response data={response} query={query} />}
    </div>
  );
}
