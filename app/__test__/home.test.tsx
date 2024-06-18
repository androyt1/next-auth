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
});
