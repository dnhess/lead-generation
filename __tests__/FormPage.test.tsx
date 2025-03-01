import { render, screen, fireEvent } from "@testing-library/react"
import { FormPage } from "@/components/form-page"

jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("FormPage", () => {
  it("renders the form fields", () => {
    render(<FormPage />)

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByText("Country of Citizenship")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("LinkedIn / Personal Website URL")).toBeInTheDocument()
    expect(screen.getByText("Visa categories of interest?")).toBeInTheDocument()
    expect(screen.getByText("How can we help you?")).toBeInTheDocument()
    expect(screen.getByText("Upload your Resume/CV")).toBeInTheDocument()
  })

  it("shows error messages for empty required fields", async () => {
    render(<FormPage />)

    fireEvent.click(screen.getByText("Submit"))

    expect(await screen.findByText("First name is required")).toBeInTheDocument()
    expect(await screen.findByText("Last name is required")).toBeInTheDocument()
    expect(await screen.findByText("Email is required")).toBeInTheDocument()
    // Add more assertions for other required fields
  })

  // Add more tests for form submission, file upload, etc.
})

