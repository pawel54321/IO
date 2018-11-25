pipeline {

  agent any

  stages {
    stage('Checkout') {
      checkout scm
    }
    stage('Build'){
     sh 'cd my-app'
     sh 'npm install'
     sh 'npm build'
    }
    stage('Test'){
      sh 'npm test'
    }
    stage('Deploy'){
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app localhost:5000/react-app'
        sh 'docker push localhost:5000/react-app'
        sh 'docker rmi -f react-app localhost:5000/react-app'
    }
  }
}
