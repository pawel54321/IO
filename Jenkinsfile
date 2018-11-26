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
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test'){
      steps{
        sh 'npm test'
      }
    }
    stage('Deploy'){
      steps {
        sh 'npm start'
      }
    }
  }
}
