import { useContext } from "react"
import { CategoryContext } from "../../App"
import CategoryList from "./CategoryList"
import { Box, Stack } from "@mui/material"
import CategoryForm from "./CategoryForm"

const CategoryContainer = () => {
  const { categoryState } = useContext(CategoryContext)

  return (
    <Box paddingTop="10vh">
      {/* Add Category comp */}
      <CategoryForm category={{}} button="add" />
      <Stack gap={1}>
        {categoryState.categories.map((cat) => {
          return (
            <CategoryList key={cat._id} category={cat} />
          )
        })}
      </Stack>
    </Box>
  )
}

export default CategoryContainer