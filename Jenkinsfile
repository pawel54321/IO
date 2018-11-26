pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  stages {
    stage('Build'){
      steps{
        sh 'docker-compose build test'
      }
    }
    stage('Test'){
      steps{
        sh 'docker-compose run --rm test'
      }
    }
    stage('Deploy'){
      steps {
        sh 'docker-compose build dev'
        sh 'docker-compose up dev'
      }
    }
  }
}
