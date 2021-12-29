import React from 'react';
import { Select } from 'antd';

export const CustomDropdown = ({ tags, onSelect, selectedDefault }) => (
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select at least one tag"
    onChange={onSelect}
    optionLabelProp="label"
    optionFilterProp="label"
    defaultValue={selectedDefault}
  >
    {tags?.length && tags.map((tag) => (
      <Select.Option value={tag.id} key={tag.id} label={tag.name}>
        <div className="demo-option-label-item">
          {tag.name}
        </div>
      </Select.Option>
    ))}
  </Select>
);
