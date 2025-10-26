"use client"

import { Controller } from "react-hook-form";
import GlobalInputComp from "../inputfields/GlobalInputComp";

function CustomFormComp(props: any) {
    const {MappingFields, control, errors, submitHandler, handleSubmit} = props;

return(
  <div className="w-1/2">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full border-2 border-slate-900 rounded flex flex-col gap-12 justify-center items-center p-8">
        {MappingFields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            defaultValue={field.type === "number" ? 0 : ""}
            control={control}
            render={({ field: inputField }) => (
              <GlobalInputComp
                heading={field.heading}
                type={field.type}
                error={errors?.[field.name]?.message}
                {...inputField}
              />
            )}
          />
        ))}

        <button type="submit" className="mt-4 p-2 bg-orange-400 text-white rounded w-[60%]">
          Submit
        </button>
      </form>
    </div>
)
}

export default CustomFormComp;