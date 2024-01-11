import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"
import axios from "../../config/axiosConfig"
import { useContext } from "react"
import { CategoryContext } from "../../App"
import CategoryForm from './CategoryForm'

const CategoryList = (props) => {
  const { category } = props
  const { categoryDispatch } = useContext(CategoryContext)

  const handleDeleteCategory = async () => {
    const confirm = window.confirm("delete category?");
    if (confirm) {
      if (category._id !== "659ead71964ee28a078e1f36") {
        const result = await axios.delete(`categories/delete/${category._id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        categoryDispatch({ type: "DELETE_CATEGORY", payload: result.data })
      } else {
        alert("You cannot delete default category")
      }
    }
  }

  return (
    <>
      <Card sx={{ display: "flex", justifyContent: "space-between" }} >
        <CardContent>
          <Typography variant="h6" component="div">
            {category.name}
          </Typography>
        </CardContent>
        <CardActions>
          {/* edit category comp */}
          <CategoryForm category={category} button="edit" />
          <Button variant="contained" onClick={handleDeleteCategory}>
            delete
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default CategoryList