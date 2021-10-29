import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { updateModule } from "../services/api";
import { useRoute } from "../hooks/useRoute";
import { updateModuleName } from "../redux/slices/module";

function EditModule() {
  const module = useSelector((state) => state.module);
  const [name, setName] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const lastRoute = `/admin/module/${module.id}`;
  const router = useRoute();
  const dispatch = useDispatch();

  const setValues = useCallback(() => {
    setName(module.name);
  }, [module.name]);

  useEffect(() => {
    setValues();
  }, [setValues]);

  const handleName = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data } = await updateModule(name, module.id, token);

    if (data.status === "success") {
      dispatch(updateModuleName(name));
      return router(lastRoute);
    }
  };

  return (
    <div>
      <Header />
      <form className="form" onSubmit={(e) => handleUpdate(e)}>
        <div>
          <input type="text" value={name} onChange={(e) => handleName(e)} />
        </div>
        <div className="btn-container">
          <button onClick={() => router(lastRoute)}>Go back</button>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditModule;
