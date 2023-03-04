import FooterNavigationSection from "../../types/FooterNavigationSection"
import HeaderNavigationItem from "../../types/HeaderNavigationItem"

const getPublicNavigationItems = () => {
  const headerNavigationItems: HeaderNavigationItem[] = [
    {
      label: "Overview",
      path: "/"
    },
    { label: "Sign In", path: "/sign-in" },
    {
      label: "Sign Up",
      path: "/sign-up"
    }
  ]

  const footerNavigationSections: FooterNavigationSection[] = [
    {
      section: "Company",
      items: [
        {
          label: "About",
          path: "/about"
        }
      ]
    }
  ]

  return { headerNavigationItems, footerNavigationSections }
}

export default getPublicNavigationItems
