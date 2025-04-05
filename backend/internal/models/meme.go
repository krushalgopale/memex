package models

import "time"

type Meme struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Url       string    `json:"url"`
	UserID    uint      `json:"user_id"`
	Username  string    `json:"username"`
	Likes     uint      `gorm:"default:0" json:"likes"`
	CreatedAt time.Time `json:"created_at"`
}
