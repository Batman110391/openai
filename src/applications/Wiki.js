import React from "react";

export default function Wiki() {
  React.useEffect(() => {
    (async () => {
      console.log("hi");
    })();
  }, []);

  return <div>Wiki</div>;
}
