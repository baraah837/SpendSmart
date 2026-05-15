import { render, screen } from "@testing-library/react";
import AddExpense from "./pages/AddExpense";
test("renders page title", () => {
 render(<AddExpense />);
 expect(screen.getAllByText(/expense/i).length).toBeGreaterThan(0);
});
test("renders successfully", () => {
 render(<AddExpense />);
 expect(true).toBe(true);
});
test("button exists", () => {
 render(<AddExpense />);
 const buttons = screen.getAllByRole("button");
 expect(buttons.length).toBeGreaterThan(0);
});
test("component loads", () => {
 render(<AddExpense />);
 expect(document.body).toBeInTheDocument();
});