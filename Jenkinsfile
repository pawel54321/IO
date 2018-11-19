// Jenkinsfile
pipeline {
  environment {
    registry = "gpzak/IO"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning') {
      steps {
        git 'https://github.com/gpzak/IO.git'
      }
    }
    stage('Build') {
       steps {
         sh 'npm install'
         sh 'npm init'
         sh 'npm run bowerInstall'
       }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Building') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
              dockerImage.push()
            }
         }
      }
    }
  }
}
