package main

import (
	"context"
	"fmt"
	"os/exec"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)


type App struct {
	ctx context.Context
}

func (g *App) GetTags(repoPath string, limit int) ([]string, error) {
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return nil, fmt.Errorf("could not open repository: %w", err)
	}

	tags, err := repo.Tags()
	if err != nil {
		return nil, fmt.Errorf("could not list tags: %w", err)
	}

	var tagList []string
	err = tags.ForEach(func(ref *plumbing.Reference) error {
		tagList = append(tagList, ref.Name().Short())
		if len(tagList) >= limit {
			return fmt.Errorf("limit reached")
		}
		return nil
	})
	if err != nil && err.Error() != "limit reached" {
		return nil, err
	}

	return tagList, nil
}


func (c *App) ExecuteCommand(path string, args []string) (string, error) {
	cmd := exec.Command(path, args...)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("command execution failed: %w. Output: %s", err, output)
	}
	return string(output), nil
}


func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}