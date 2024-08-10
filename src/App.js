import React from "react";
import { useFormik } from "formik";
import CustomRadioButton from "./Components/RadioButton";
import Checkbox from "./Components/Checkbox";
import "./App.css";
import InputFields from "./Components/InputFields";
import API from "./API";

export default function App() {
  const formik = useFormik({
    initialValues: {
      name: "four",
      rate: "4",
      taxOption: "",
      bracelets: {
        parent: false,
        jasintheBracelet1: false,
        jasintheBracelet2: false,
        inspireBracelet: false,
      },
      otherItems: {
        parent: false,
        item1: false,
        item2: false,
        item3: false,
      },
    },
    onSubmit: async (values) => {
      const applicableItems = [];
      const braceletData = await API;
      const selectedBraceletIds = braceletData
        .filter((bracelet) => {
          if (
            values.bracelets.jasintheBracelet1 &&
            bracelet.name === "Jasinthe Bracelet"
          ) {
            return true;
          }
          if (
            values.bracelets.jasintheBracelet2 &&
            bracelet.name === "Jasinthe Bracelet"
          ) {
            return true;
          }
          if (
            values.bracelets.inspireBracelet &&
            bracelet.name === "Inspire Bracelet"
          ) {
            return true;
          }
          return false;
        })
        .map((bracelet) => bracelet.id);

      applicableItems.push(...selectedBraceletIds);

      const appliedTo = values.taxOption === "allItems" ? "all" : "some";
      const rate = parseFloat(values.rate) / 100;
      const formData = {
        applicable_items: applicableItems,
        applied_to: appliedTo,
        name: values.name,
        rate: rate,
      };

      console.log("Form Data:", JSON.stringify(formData, null, 2));

      console.log("Fetched Bracelet IDs:", applicableItems);
    },
  });

  const handleParentCheckboxChange = (section, itemName) => {
    const newParentChecked = !formik.values[section].parent;
    const updatedItems = Object.keys(formik.values[section]).reduce(
      (acc, item) => {
        if (item !== "parent") {
          acc[item] = newParentChecked;
        }
        return acc;
      },
      {}
    );
    formik.setFieldValue(section, {
      parent: newParentChecked,
      ...updatedItems,
    });
  };

  const handleChildCheckboxChange = (section, item) => {
    const newItems = {
      ...formik.values[section],
      [item]: !formik.values[section][item],
    };
    const allChecked = Object.values(newItems).every((val) => val);
    formik.setFieldValue(section, {
      parent: allChecked,
      ...newItems,
    });
  };

  return (
    <div>
      <div className="w-[85%] m-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4 py-6 px-6 border-b">
            <div className="flex justify-between">
              <h3 className="font-semibold text-[20px]">Add Tax</h3>
              <button
                type="button"
                className="border-none text-[20px] font-semibold"
              >
                X
              </button>
            </div>

            <div className="flex gap-2">
              <InputFields
                placeholder={""}
                img={""}
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                style={"w-[50%]"}
              />
              <InputFields
                placeholder={""}
                img={"./icons8-percentage-24.png"}
                value={formik.values.rate}
                onChange={formik.handleChange}
                name="rate"
                style={"w-[20%]"}
                imgStyle={"right-[2%] top-[20%]"}
              />
            </div>

            <div className="flex flex-col gap-1">
              <CustomRadioButton
                label={"Apply to all items in collection"}
                name="taxOption"
                value="allItems"
                checked={formik.values.taxOption === "allItems"}
                onChange={formik.handleChange}
              />
              <CustomRadioButton
                label={"Apply to specific items"}
                name="taxOption"
                value="specificItems"
                checked={formik.values.taxOption === "specificItems"}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 py-6 px-6 pb-28 border-b">
            <InputFields
              placeholder={"search Items"}
              img={"./search.svg"}
              style={"md:w-[35%] sm:w-full"}
              inputStyle={"pl-10"}
              imgStyle={"left-[3%] top-[20%] "}
            />
            <div>
              <Checkbox
                label={"Bracelets"}
                style={"bg-[#dfdfdf] px-2 py-1 rounded"}
                checked={formik.values.bracelets.parent}
                onChange={() =>
                  handleParentCheckboxChange("bracelets", "parent")
                }
              />
              <div className="px-5 [&>*]:py-1">
                <Checkbox
                  label={"Jasinthe Bracelet"}
                  checked={formik.values.bracelets.jasintheBracelet1}
                  onChange={() =>
                    handleChildCheckboxChange("bracelets", "jasintheBracelet1")
                  }
                />
                <Checkbox
                  label={"Jasinthe Bracelet"}
                  checked={formik.values.bracelets.jasintheBracelet2}
                  onChange={() =>
                    handleChildCheckboxChange("bracelets", "jasintheBracelet2")
                  }
                />
                <Checkbox
                  label={"Inspire Bracelet"}
                  checked={formik.values.bracelets.inspireBracelet}
                  onChange={() =>
                    handleChildCheckboxChange("bracelets", "inspireBracelet")
                  }
                />
              </div>
            </div>

            <div>
              <Checkbox
                style={"bg-[#dfdfdf] p-2 rounded"}
                checked={formik.values.otherItems.parent}
                onChange={() =>
                  handleParentCheckboxChange("otherItems", "parent")
                }
              />
              <div className="px-5 [&>*]:py-1">
                <Checkbox
                  label={"Zero amount item with question"}
                  checked={formik.values.otherItems.item1}
                  onChange={() =>
                    handleChildCheckboxChange("otherItems", "item1")
                  }
                />
                <Checkbox
                  label={"Normal item with questions"}
                  checked={formik.values.otherItems.item2}
                  onChange={() =>
                    handleChildCheckboxChange("otherItems", "item2")
                  }
                />
                <Checkbox
                  label={"Normal item"}
                  checked={formik.values.otherItems.item3}
                  onChange={() =>
                    handleChildCheckboxChange("otherItems", "item3")
                  }
                />
              </div>
            </div>
          </div>

          <div className="w-full py-3 px-6 flex justify-end">
            <button
              type="submit"
              className="p-2 px-4 bg-[#ff7321] text-[white] rounded-sm"
            >
              Apply tax to 6 items(s)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
