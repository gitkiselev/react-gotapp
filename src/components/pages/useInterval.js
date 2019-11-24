import React, { useState, useEffect } from "react";
function SetStateFixed({ componentText } = props) {
  return (
    <div className="subcomponent">
      <p>{componentText}</p>
    </div>
  );
}
export default SetStateFixed;