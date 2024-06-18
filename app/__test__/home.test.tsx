import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "../page";

describe("Home page", () => {
    it("Should render correctly", () => {
        render(<Home />);
        expect(
            screen.getByRole("heading", { level: 1, name: /Welcome to our platform/i })
        ).toBeDefined();
    });
    it("render sub heading", () => {
        render(<Home />);
        const subheading = screen.getByText(
            /The all-in-one platform for building, deploying, and managing modern web apps./i
        );
        expect(subheading).toBeInTheDocument();
    });

    it("Should render signup button", () => {
        render(<Home />);
        const signupButton = screen.getByRole("link", { name: /sign up/i });
        expect(signupButton).toBeInTheDocument();
        expect(signupButton).toHaveAttribute("href", "/register");
    });
});
