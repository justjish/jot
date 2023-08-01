# Jot

A simple note taking app

**_[CHECK OUT THE APP HERE](https://jot.jish.dev)_**

## Running the App

You should have been granted access to the Supabase project. That is where all the configuration occurs.
To access the backend, simply visit [Supabase](https://supabase.com/dashboard/) and select the project

The .env.local should have also been provided. With that simple type `pnpm dev`

### Local Dev Env Requirements

Install Required Dependencies (Mac Instructions)

```bash
brew upgrade

## Node
brew install node

## Package Manager (Pick your preferred option)
### Option 1
brew install pnpm
### Option 2
npm i -G pnpm


## Editor (Optional)
brew install cask visual-studio-code

## The following is for Local Development.
## You can ignore for now, Supabase CLI needs some work to reconcile the platform with local.
### Supabase CLI
brew install supabase/tap/supabase

### Docker Desktop
#### Option 1 (Recommended) Download and install from link below
#### https://docs.docker.com/desktop/install/mac-install/

#### Option 2 Brew Cask, Should download the same file,
#### but you want to update with the App itself, so its
#### kinda pointless having brew install imho.
brew install --cask docker

#### Option 3 ... Don't do this unless you know what you
#### are getting into lol.
brew install docker


```
