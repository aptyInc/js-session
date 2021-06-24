package main

import (
	"fmt"
	"practice/helpers"
)

func init() {
	fmt.Println("me before anything else")
}

func main() {
	defer fmt.Println("disconnect")
	fmt.Println("hello world")
	helpers.Help()

	a := []int{3, 4, 5}
	fmt.Println(a)
}
