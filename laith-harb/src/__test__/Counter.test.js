import React from "react";
import Counter from "../Counter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  let component = render(<Counter />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
    console.log('success');
});

describe("Suite 01", () => {
  test("header render with text", () => {
    let counterHeader = getByTestId("header");
    expect(counterHeader.textContent).toBe("My Counter");
  });

  test("Counter starts with 0", () => {
    let counterHeader = getByTestId("counter");
    expect(counterHeader.textContent).toBe("0");
  });

  test("input initial value is 1", () => {
    let inputEl = getByTestId("input");
    expect(inputEl.value).toBe("1");
  });
});

test("Add button should display +", () => {
  let addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("Remove button should display -", () => {
  let removeBtn = getByTestId("rem-btn");
  expect(removeBtn.textContent).toBe("-");
});

test("change value of input number", () => {
  let inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: { value: 5 },
  });
});

test("click btn ADD 1 to counter", () => {
  let addBtn = getByTestId("add-btn");
  let counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");
  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe("1");
});

test("click btn REMOVE 1 to counter", () => {
  let subBtn = getByTestId("rem-btn");

  let counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
  fireEvent.click(subBtn);
  expect(counterEl.textContent).toBe("-1");
});

test("Change value to 7 and click remove btn", () => {
  let subBtn = getByTestId("rem-btn");
  let counterEl = getByTestId("counter");
  const inpEl = getByTestId("input");

  fireEvent.change(inpEl, {
    target: { value: 7 },
  });
  fireEvent.click(subBtn);
  expect(counterEl.textContent).toBe("-7");
  fireEvent.click(subBtn);
  expect(counterEl.textContent).toBe("-14");
});

test("color by value", () => {
  let counterEl = getByTestId("counter");
  let inpEl = getByTestId("input");
  let addBtn = getByTestId("add-btn");
  let remBtn = getByTestId("rem-btn");

  expect(counterEl.textContent).toBe("0");
  expect(counterEl.className).toBe("");

  fireEvent.change(inpEl, {
    target: { value: 90 },
  });

  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe("90");

  fireEvent.click(addBtn);
  expect(counterEl.textContent).toBe("180");
  expect(counterEl.className).toBe("green");

  fireEvent.click(remBtn);
  fireEvent.click(remBtn);
  fireEvent.click(remBtn);
  fireEvent.click(remBtn);
  expect(counterEl.textContent).toBe("-180");
  expect(counterEl.className).toBe("red");
});
