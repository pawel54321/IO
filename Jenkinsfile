pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  stages {
    stage('Build'){
     sh 'npm install'
     sh 'npm run-script build --prefix react-app'
    }
    stage('Test'){
      sh 'npm test'
    }
    stage('Deploy'){

    }
  }
}
