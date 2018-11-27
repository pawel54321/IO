pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  environment {
    PATH = "$PATH:/usr/local/bin"
  }

  stages {
    stage('Build'){
      steps{
        sh 'npm install --prefix react-app'
        sh 'npm run build --prefix react-app'
      }
    }
    stage('Test'){
      steps{
        sh 'npm run test --prefix react-app --coverage'
      }
    }
    stage('Deploy'){
      steps {
        sh 'docker-compose up'
      }
    }
  }
}
