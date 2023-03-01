import { setupServer } from "msw/node";
import SectionPage from "../components/TopicMenu/Topics/SectionPage";
import { render, waitFor, screen } from "@testing-library/react"
import { rest } from "msw"
import AlignmentPage from "../components/TopicMenu/Topics/AlignmentPage";


const server = setupServer(
    rest.get("/api", (req, res, ctx) => {
        return res(ctx.json({name: 'Jack'}))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("gets the data", async () => {
    render(<SectionPage />);

    const out = await waitFor(() => screen.findByRole("contentinfo")) 
    expect(out).not.toHaveTextContent("")
})

test("alignment page is shown when the data name is equal to alignment", () => {

})