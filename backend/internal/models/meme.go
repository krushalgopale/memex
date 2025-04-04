package models

import "gorm.io/gorm"

type Meme struct {
	gorm.Model
	Url string
}
