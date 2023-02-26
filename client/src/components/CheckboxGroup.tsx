import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
type Props = {
  checkedList: CheckboxValueType[];
  setCheckedList: Dispatch<SetStateAction<CheckboxValueType[]>>;
};

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["L1", "L2", "L3", "M1", "M2", "D"];

const NiveauCheckBox = ({ checkedList, setCheckedList }: Props) => {
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  useEffect(() => {
    if (!checkedList.length) {
      setCheckAll(false);
    } else if (checkedList.length === 6) {
      setCheckAll(true);
    } else {
      setIndeterminate(true);
    }
  }, [checkedList]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Selectioner tous
      </Checkbox>
      <div></div>
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};

export default NiveauCheckBox;
